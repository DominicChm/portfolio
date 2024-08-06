---
title: "aioros2"
date: "2024-6-30"
github: https://github.com/California-Strawberry-Commission/laser-runner-cutter/tree/main/ros2/aioros2
categories:
  - "python"
  - "ros2"
  - "software"
  - "csc"
  - "highlight"
cover: "/portfolio/assets/aioros2/pyhero.png"
excerpt: A Pythonic way to interact with ROS2
---

If you've ever had to work with [Robot Operating System 2](https://www.ros.org/) (ROS2) in python, you'll know that getting it set up is the least of your issues. From using its own async model (rather than the standard `asyncio`) to relying entirely on callbacks, using it can be very painful for modern developers. That's why I developed `aioros2`, which leverages [asyncio](https://docs.python.org/3/library/asyncio.html) among other python features to wrap [rclpy](https://github.com/ros2/rclpy) in an intuitive, pythonic manner. 

I took heavy inspiration from the decorator-centric API of `python-socketio` which allowed me to reduce boilerplate by more than half compared to native `rclpy`. Additionally, I added a dependency management system which enabled me to effectively automate the generation of client libraries which must be manually created and maintained in native `rclpy`.

The result (in my opinion) is a massive improvement in developer ergonomics, project management, and integration speed when using `ROS2`. 
`aioros2` still under heavy development and through documentation needs to be written, but feedback I've received from fellow developers is very positive.


## Comparison
The following is a simple [action node and client](https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html) (derived from the [official example](https://github.com/ros2/examples/tree/rolling/rclpy/actions)) which computes the fibonacci sequence, written in `rclpy`. 

```python
############### Server.py ###############
import time

import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node

from action_tutorials_interfaces.action import Fibonacci


class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')

        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            feedback_msg.partial_sequence.append(
                feedback_msg.partial_sequence[i] + feedback_msg.partial_sequence[i-1])
            self.get_logger().info('Feedback: {0}'.format(feedback_msg.partial_sequence))
            goal_handle.publish_feedback(feedback_msg)
            time.sleep(1)

        goal_handle.succeed()

        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        return result


def main(args=None):
    rclpy.init(args=args)

    fibonacci_action_server = FibonacciActionServer()

    rclpy.spin(fibonacci_action_server)


if __name__ == '__main__':
    main()

############### Client.py ###############
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node

from action_tutorials_interfaces.action import Fibonacci


class FibonacciActionClient(Node):

    def __init__(self):
        super().__init__('fibonacci_action_client')
        self._action_client = ActionClient(self, Fibonacci, 'fibonacci')

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self._action_client.wait_for_server()

        self._send_goal_future = self._action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info('Result: {0}'.format(result.sequence))
        rclpy.shutdown()

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info('Received feedback: {0}'.format(feedback.partial_sequence))


def main(args=None):
    rclpy.init(args=args)

    action_client = FibonacciActionClient()

    action_client.send_goal(10)

    rclpy.spin(action_client)


if __name__ == '__main__':
    main()
```


Now, here's the same node written using `aioros2`:
```python
############### Server.py ###############
import asyncio
from action_tutorials_interfaces.action import Fibonacci
from aioros2 import node, action, serve_nodes, result, feedback

@node()
class Fibonacci:

    @action("~/fibonacci", Fibonacci)
    async def action_fib(self, order):
        sequence = [0, 1]
        for i in range(order):
            sequence.append(sequence[-1] + sequence[-2])
            yield feedback(partial_sequence=sequence)
            await asyncio.sleep(1)

        # Last yield is result
        yield result(sequence=sequence)
        

def main():
    serve_nodes(Fibonacci())

if __name__ == "__main__":
    main()

############### Client.py ###############
import asyncio
from .server import Fibonacci
from aioros2 import ClientDriver

async def _main():
    n = ClientDriver(Fibonacci())

    print("Calling action!")
    action = n.action_fib(order=10)
    async for feedback in action:
        print("Got partial sequence:", feedback.partial_sequence)
    print("Got result: ", action.result.sequence)

def main():
    asyncio.run(_main())

if __name__ == "__main__":
    main()
```

By using `asyncio` with async generators, `aioros2` is able to halve lines of code and greatly increase readability. 