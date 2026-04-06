"""
Pi Pico LCD Greeting
Displays "yooo what up" on a 16x2 I2C LCD (HD44780 + PCF8574 backpack)

Wiring:
  LCD SDA -> Pico GP0 (pin 1)
  LCD SCL -> Pico GP1 (pin 2)
  LCD VCC -> Pico 3.3V or 5V
  LCD GND -> Pico GND

Requires: pico_i2c_lcd.py and lcd_api.py on your Pico
  Download from: https://github.com/T-622/RPI-PICO-I2C-LCD
"""

from machine import I2C, Pin
from pico_i2c_lcd import I2cLcd
import time

# I2C setup (GP0=SDA, GP1=SCL)
I2C_ADDR = 0x27   # Common address; try 0x3F if nothing shows
I2C_NUM_ROWS = 2
I2C_NUM_COLS = 16

i2c = I2C(0, sda=Pin(0), scl=Pin(1), freq=400_000)
lcd = I2cLcd(i2c, I2C_ADDR, I2C_NUM_ROWS, I2C_NUM_COLS)

lcd.clear()
lcd.move_to(0, 0)  # column 0, row 0
lcd.putstr("yooo what up")

# Keep the message displayed
while True:
    time.sleep(1)
