import numpy as np
from keras.models import load_model
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
import os
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# Conneting Database
database = mysql.connector.connect(
  host="localhost",
  user="root",
  password="home@123",
  database="Member",
)

if database:
    print('DATABASE: ', database)
    print("connection successful!")
else:
    print("connection unsuccessful")

model = load_model('backend/models/final_model951.h5', custom_objects={"learning_rate": 0.001})
atrophic_model = load_model('backend/models/resNet-sub66.h5' , custom_objects={"learning_rate": 0.001})
hypertrophic_model = load_model('backend/models/resNetSub86.h5' , custom_objects={"learning_rate": 0.001})

ALLOWED_EXTENTIONS = set(['png', 'jpg', 'jpeg'])
image_path = "backend/Images"
pred = []
deficiency = {}
sum = []


def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENTIONS

@app.route('/upload', methods = ['POST'])
def upload():
    pred.clear()

    if 'file' not in request.files:
        return jsonify({'error': 'media not provided'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'no file selected'}), 400
    if file and allowed_files(file.filename):
        filename = secure_filename(file.filename)
        
        path = os.path.join(image_path, filename)

        file.save(os.path.join(image_path, filename))

        load_im = load_img(path, target_size=(224,224))
        img = img_to_array(load_im)
        img = np.expand_dims(img, axis = 0)
        prediction = model.predict(img)
        category = int(np.argmax(prediction, axis = 1))

        if category == 0:
            pred.append(0)
            prediction1 = np.array(atrophic_model.predict(img))
            prediction_list = prediction1.tolist()[0]
            for i in range(len(prediction_list)):
                value = prediction_list[i] * 100
                pred.append(round(value))
            print("atrophic" , prediction_list, "array", pred)

        if category == 1:
            pred.append(1)
            print("healthy")

        if category == 2:
            pred.append(2)
            prediction2 = hypertrophic_model.predict(img)
            predicts = int(np.argmax(prediction2, axis = 1))
            pred.append(predicts)
            print("hypertrophic" , pred)

    return jsonify({'prediction' : pred })
    # return jsonify({'url' : image_path + file.filename })

@app.route('/classify', methods=['GET'])
def classify():
    if(len(pred) == 0):
        return jsonify({'error': 'media not provided'}), 400
    return jsonify({"pred":pred})

@app.route('/test', methods=['POST'])
def getVitaminDef():

    data = request.get_json()

    deficiency.clear()
    sum.clear()
    level = 0 
    time = 0
    
    arr1 = data['1']
    arr2 = data['2']
    arr3 = data['3']
    arr4 = data['4']

    vitamin_a = arr1[2] + arr1[10] + arr2[5] + arr2[7] + arr3[0] 
    vitamin_b = arr2[9] + arr2[8] + arr2[1] + arr2[2] + arr2[3] 
    vitamin_c = arr1[0] + arr1[1] + arr2[2] + arr2[7] + arr3[5] 
    vitamin_e = arr1[1] + arr1[2] + arr1[3] + arr2[4] + arr3[6] 
    vitamin_k = arr2[10] + arr3[4] + arr3[8] + arr3[9] + arr3[10]

    iron = arr1[4] + arr2[3] + arr2[0] + arr2[1] + arr2[3] 
    zinc = arr1[3] + arr2[4] + arr2[7] + arr3[6] + arr3[7] 
    coll = arr1[6] + arr1[7] + arr2[2] + arr2[6] + arr1[5] 
    
    health = arr4[6] + arr4[1] + arr4[2] + arr4[4] + arr4[5] 
    habits = arr4[0] + arr4[3] + arr4[7] + arr4[8] + arr4[9]

    result = [vitamin_a, vitamin_b, vitamin_c, vitamin_e, vitamin_k, iron, zinc, coll, health, habits]

    for i in range(len(result)):
        if result[i] <= 3:
            deficiency[str(i)] = 0
        elif result[i] >= 3 and i <= 6:
            level += 1
            deficiency[str(i)] = 1
        else:
            level += 2
            deficiency[str(i)] = 2

    cure = (level * 100) / 20
    scar = int(arr4[10])

    print(cure)

    if scar == 1:
        time = 6 
        print(time)
        sum.append(round(time))
    elif scar == 2:
        time = 12 
        print("time" , time)
        sum.append(round(time))
    elif scar == 3:
        time = 18 
        print(time)
        sum.append(round(time))

    sum.append(scar)
    print(sum)
    
    return jsonify({'summary' : deficiency})

@app.route('/summary', methods=['GET'])
def summary():
    if(len(deficiency) == 0):
        return jsonify({'error': 'please take the quiz!'}), 400
    else:
        return jsonify({"deficiency" : deficiency, 'sum' : sum})

@app.route('/feedback', methods=['POST'])
def feedback():
    
    data = request.get_json()

    email = data['email']
    feedback = data['feedback']
    ratings = data['ratings']
    name = data['name']

    cursor = database.cursor()
    cursor.execute("SELECT COUNT(*) FROM Member.feedback WHERE email=%s", (email,))
    result = cursor.fetchone()

    if result[0] > 0:
        cursor.execute("""UPDATE `Member`.`feedback` SET ratings = %s, feedback = %s,  name = %s WHERE email = %s""",
                       (ratings, feedback, name, email))
        database.commit()
        return jsonify({'message': 'Feedback updated successfully'})
    else:
        cursor = database.cursor()
        cursor.execute("""INSERT INTO `Member`.`feedback` (name, email ,feedback, ratings)
                        VALUES (%s,%s,%s,%s);""",(name, email, feedback, ratings))
        database.commit()
    return jsonify({'message': 'Feedback added successfully'})

@app.route('/getfeedback', methods=['GET'])
def getfeedback():

    cursor = database.cursor()
    cursor.execute("""SELECT * FROM Member.Feedback;""")
    feedbacks = cursor.fetchall()
    
    return jsonify({"feedbacks":feedbacks})

@app.route('/treatments', methods=['GET'])
def getTreatments():

    cursor = database.cursor()
    cursor.execute("""SELECT * FROM Member.Treatments;""")
    treatments = cursor.fetchall()

    cursor.execute("""SELECT * FROM Member.Product;""")
    products = cursor.fetchall()
    
    return jsonify({"treatments":treatments, "products": products})

app.run()
