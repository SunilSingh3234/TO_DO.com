from flask import Flask, render_template, jsonify, request # type: ignore

app = Flask(__name__)

# Sample data to store to-do items (in-memory storage)
todos = []

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to add a task
@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    task = {
        "id": len(todos) + 1,
        "content": data['content']
    }
    todos.append(task)
    return jsonify(task)

# API endpoint to get all tasks
@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    return jsonify(todos)

# API endpoint to delete a task by ID
@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global todos
    todos = [task for task in todos if task["id"] != task_id]
    return jsonify({"message": "Task deleted"})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
