from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Dummy credentials for demonstration
USER_CREDENTIALS = {
    'username': 'admin',
    'password': 'admin123'
}

# Dijkstra's Algorithm implementation
import heapq

def dijkstra(graph, start):
    shortest_path = {vertex: float('infinity') for vertex in graph}
    shortest_path[start] = 0
    priority_queue = [(0, start)]

    while priority_queue:
        current_distance, current_vertex = heapq.heappop(priority_queue)

        if current_distance > shortest_path[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            if distance < shortest_path[neighbor]:
                shortest_path[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return shortest_path


# Dummy graph for testing
GRAPH = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}


@app.route('/')
def login():
    return render_template('login.html')


@app.route('/input_form', methods=['POST'])
def input_form():
    username = request.form['username']
    password = request.form['password']

    # Debugging statements
    print(f"Received Username: {username}")
    print(f"Received Password: {password}")

    if username == USER_CREDENTIALS['username'] and password == USER_CREDENTIALS['password']:
        print("Login successful")
        return redirect(url_for('index'))
    else:
        print("Invalid credentials")
        return "Invalid credentials. Please try again."


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/dijkstra', methods=['GET', 'POST'])
def dijkstra_page():
    result = None
    if request.method == 'POST':
        start_node = request.form['start_node']
        print(f"Start Node: {start_node}")

        if start_node in GRAPH:
            result = dijkstra(GRAPH, start_node)
        else:
            result = "Invalid start node!"

    return render_template('index.html', result=result)


if __name__ == '__main__':
    app.run(debug=True)

