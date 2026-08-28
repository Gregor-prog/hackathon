# VitalSense — IoT Health Monitoring System

**1st Runner-up, IEEE Hackathon** | Team NeuroBits

VitalSense is a multi-sensor IoT health monitoring device built on the ESP32, capturing real-time heart rate, blood oxygen (SpO2), and body temperature data and streaming it to the cloud for live monitoring.

## Hardware

- **Microcontroller:** ESP32 (dual-core)
- **MAX30102** — heart rate and pulse oximetry (SpO2) sensor, I2C
- **DS18B20** — digital temperature sensor, OneWire

## Architecture

The system runs three concurrent FreeRTOS tasks:

| Task | Core | Priority | Responsibility |
|---|---|---|---|
| MAX30102 Task | 0 | High | Continuous heart rate / SpO2 sampling |
| Temperature Task | 0 | Medium | Non-blocking DS18B20 temperature reads |
| Firebase Task | 1 | Low | WiFi connection + real-time data push to Firebase |

Sensor readings (`currentTemp`, `heartRate`, `spO2`) are shared across tasks and protected by a **mutex** (`xMutex`) to prevent race conditions during concurrent read/write access.

## The Problem, and the Fix

The DS18B20 has a conversion delay of up to 750ms. A naive implementation calls a blocking `delay()` during this window, freezing the entire execution loop, including the code responsible for servicing the MAX30102 sensor. In early development, this caused the DS18B20 to effectively starve the MAX30102 of the processing time it needed, so only one sensor's readings would come through reliably at a time.

**Fix:** the DS18B20 read was converted to non-blocking, using `setWaitForConversion(false)` and manual elapsed-time tracking via `millis()` instead of a fixed delay. Combined with FreeRTOS task separation and mutex-protected shared state, this eliminated the conflict and let both sensors run independently and reliably.

## Data Flow

Sensor readings → shared state (mutex-protected) → Firebase Task → Firebase Realtime Database, over WiFi, every 5 seconds.

## Status

Hardware/firmware prototype built and demonstrated for IEEE Hackathon (Feb–Mar 2025). Not currently actively maintained; shared here as a technical reference.

## Note

WiFi and Firebase credentials in the source code are from the original hackathon build and are placeholder/inactive values — replace with your own before running this project.
