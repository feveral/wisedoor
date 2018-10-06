import threading
import time

def Singleton(class_):
    instances = {}
    def getinstance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]
    return getinstance

@Singleton
class TaskManager():
    def __init__(self):
        self._tasks = []    
        self.stopList = []
        self.thread_Count = -１

    def add_task(self,task,interval):
        self.thread_Count += 1
        self.stopList.append(False)
        after_set_task = self.set_task_interval(task,interval,self.thread_Count)
        thread = threading.Thread(target=after_set_task)
        thread.start()
        self._tasks.append((thread,task,interval,self.thread_Count))
        return self.thread_Count

    def delete_task(self,taskIndex):
        self.stopList[taskIndex] = True

    def set_task_interval(self,task,interval,index):
        def set_function():
            while not self.stopList[index]:
                task()
                time.sleep(interval)
        return set_function 




taskManager = TaskManager()
