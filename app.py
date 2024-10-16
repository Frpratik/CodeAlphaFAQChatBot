from flask import Flask, request, jsonify, render_template
import nltk
from nltk.tokenize import word_tokenize
from faq_data import faq_data

app = Flask(__name__)

nltk.download('punkt_tab')

def get_response(user_input):
    user_tokens = set(word_tokenize(user_input.lower()))
    
    best_match = None
    max_overlap = 0
    
    for question in faq_data.keys():
        question_tokens = set(word_tokenize(question.lower()))
        overlap = len(user_tokens.intersection(question_tokens))
        
        if overlap > max_overlap:
            max_overlap = overlap
            best_match = question

    if best_match:
        return faq_data[best_match]
    
    return "I'm sorry, I don't understand that question."

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = get_response(user_input)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
