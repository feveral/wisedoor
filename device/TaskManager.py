import threading
import time

class TaskManager():
    def __init__(self):
        self._tasks = []    
    
    def add_task(self,task,interval):
        after_set_task = self.set_task_interval(task,interval)
        thread = threading.Thread(target=after_set_task)
        thread.setDaemon(True)
        thread.start()
        self._tasks.append((thread,task,interval))

    def set_task_interval(self,task,interval):
        def set_function():
            while True:
                task()
                print('a')
                print('b')
                print('c')
                #time.sleep(interval)
        return set_function  


def test():
    print('test')

taskManager = TaskManager()
taskManager.add_task(test,1)


