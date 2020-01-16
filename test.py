import socketio
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

"""
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')



sio.connect('http://localhost:8080')


while True:
    dec = input("Plus or minus?")
    
    if dec == "+":
        sio.emit('execute', data="plus")
    elif dec == "-":
        sio.emit("execute", data="minus")
"""


options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')  # Last I checked this was necessary.
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=options)

driver.get("https://www.instagram.com/daa_dii_")


x = driver.find_elements_by_xpath("""//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span""")

print(x[0].text)


driver.quit()
