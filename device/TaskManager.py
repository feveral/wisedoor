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
        self.thread_Count = -1

    def add_task(self,task,interval):
        self.thread_Count += 1
        self.stopList.append(False)
        after_set_task = self.set_task_interval(task,interval,self.thread_Count)
        thread = threading.Thread(target=after_set_task)
        thread.start()
        self._tasks.append((thread,task,interval,self.thread_Count))
        return self.thread_Count

    def delete_task(self,task,interval):
        pass

    def set_task_interval(self,task,interval,index):
        def set_function():
            while not self.stopList[index]:
                task()
                time.sleep(interval)
        return set_function  

taskManager = TaskManager()

def t1():
    print(1)

def t2():
    print(2)

def t3():
    print(3)


t1_index = taskManager.add_task(t1,1)
t2_index = taskManager.add_task(t2,1)
t3_index = taskManager.add_task(t3,1)

input('............')
taskManager.stopList[t1_index] = True
