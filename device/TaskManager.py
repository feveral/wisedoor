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
        self.stopList.append(False)
        after_set_task = self.set_task_interval(task,interval,self.thread_Count)
        thread = threading.Thread(target=after_set_task)
        thread.start()
        self._tasks.append((thread,task,interval,self.thread_Count))
        self.thread_Count += 1
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


def t4():
    print(4)


t1num = taskManager.add_task(t1, 1)
t2num = taskManager.add_task(t2, 1)
t3num = taskManager.add_task(t3, 1)
t4num = taskManager.add_task(t4, 1)

time.sleep(3)
taskManager.stopList[t1num] = True
