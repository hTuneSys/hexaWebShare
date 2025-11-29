<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# 🚀 Getting Started with hexaWebShare

Welcome to the hexaWebShare project! This guide will help you set up your development environment, build the project components, and get started with contributing or using hexaWebShare.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: For version control
- **Node.js** and **pnpm**: For managing development tools
- **Rust**: For firmware development (install via rustup)
- **KiCad**: For PCB design (optional, for hardware development)
- **FreeCAD**: For mechanical design (optional, for enclosure design)
- **picotool**: For flashing firmware to Raspberry Pi Pico

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hTuneSys/hexaWebShare.git
   cd hexaWebShare
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up pre-commit hooks**:
   ```bash
   pnpm prepare
   ```

## Development Areas

### Firmware Development

The firmware is written in Rust for the RP2040 microcontroller.

1. **Navigate to firmware directory**:
   ```bash
   cd firmware
   ```

2. **Install Rust targets** (if not already installed):
   ```bash
   rustup target add thumbv6m-none-eabi
   ```

3. **Connect your hexaWebShare device** via USB and put it in BOOTSEL mode (hold BOOTSEL button while plugging in).

4. **Flash and test the firmware**:
   ```bash
   cargo run
   ```

   This will build the firmware and flash it to the connected device.

5. **Monitor output** (optional):
   Use a tool like `minicom` or the embedded debugger to view serial output.

### Hardware Development

PCB designs are created with KiCad.

1. **Open KiCad** and load the project:
   - Navigate to `hardware/hexaWebShare-v1/`
   - Open `hexaWebShare-v1.kicad_pro`

2. **View schematics**:
   - Open `hexaWebShare-v1.kicad_sch`

3. **View PCB layout**:
   - Open `hexaWebShare-v1.kicad_pcb`

4. **Generate fabrication files**:
   - Use KiCad's Plot and Drill tools to export Gerber files
   - Fabrication outputs are pre-generated in `fabrication_output/`

### Mechanical Development

Enclosure designs are created with FreeCAD.

1. **Open FreeCAD** and load the design files:
   - `mechanic/Bottom.FCStd` - Bottom case
   - `mechanic/PcbBoard.FCStd` - PCB mounting

2. **Export for manufacturing**:
   - Use FreeCAD's export tools for STL (3D printing) or DXF (laser cutting)

## Testing Your Setup

1. **Firmware**: After flashing, the device should blink its status LED and be detectable as a USB MIDI device.

2. **AT Commands**: Use a MIDI tool to send SysEx messages with AT commands (see [ARCHITECTURE](ARCHITECTURE.md) for details).

3. **Hardware**: Verify PCB connections and component placement.

## Documentation

For more detailed information, explore the documentation files:

- [ARCHITECTURE](ARCHITECTURE.md) - System design and AT command protocol
- [DEVELOPMENT_GUIDE](DEVELOPMENT_GUIDE.md) - Detailed development setup
- [PROJECT_STRUCTURE](PROJECT_STRUCTURE.md) - Repository organization
- [CONTRIBUTING](CONTRIBUTING.md) - How to contribute
- [FAQ](FAQ.md) - Common questions

---

## 📚 Next Steps

- Check [ARCHITECTURE](ARCHITECTURE.md) to understand system design
- Review [CONTRIBUTING](CONTRIBUTING.md) to contribute effectively

---

You're now ready to explore and build with hexaWebShare. Happy hacking!
