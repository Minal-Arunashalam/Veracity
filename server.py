from flask import Flask, request, render_template
import openai

openai.api_key = ''


app = Flask(__name__)

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Fact check the provided content for bias by crossreferencing similar articles. Your output should be a percentage describing the level of bias in the article, with 0% being no bias and 100% being fully biased. Your output must be of the format XX% where XX is the number. No other output shall be given."},
                {"role": "user", "content": data.content}
            ],
            stop=None,
            temperature=0.5,
        )
        result = response.choices[0].message.content.strip()
        return result
    except Exception as e:
        print(f"Error processing report: {e}")
        return None

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=False)