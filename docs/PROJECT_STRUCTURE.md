<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# 📁 Project Structure: `hexaWebShare`

This document outlines the organization of the hexaWebShare project repository.

## Root Directory

- `.github/`: GitHub workflows, issue templates, and configuration
- `.husky/`: Git hooks for commit linting
- `docs/`: Documentation files
- `firmware/`: Embedded firmware source code (Rust)
- `hardware/`: PCB design files (KiCad)
- `mechanic/`: Mechanical design files (FreeCAD)
- `LICENSE`: MIT license
- `README.md`: Project overview
- `package.json` & `pnpm-lock.yaml`: Node.js dependencies for tooling

## Firmware Directory (`firmware/`)

The firmware is written in Rust using the Embassy framework for the RP2040 microcontroller.

- `src/`: Source code
  - `main.rs`: Application entry point and task initialization
  - `at/`: AT command parsing and handling
  - `channel/`: Inter-task communication channels
  - `dds/`: Direct Digital Synthesis (AD985x) control
  - `error/`: Error definitions
  - `hexa_config/`: Configuration constants
  - `rgb/`: RGB LED control
  - `sysex/`: MIDI SysEx message handling
  - `usb/`: USB MIDI communication
- `build.rs`: Build script for memory layout
- `Cargo.toml`: Rust dependencies and build configuration
- `memory.x`: Linker memory layout

## Hardware Directory (`hardware/`)

PCB designs created with KiCad.

- `hexaWebShare-v1/`: Main PCB design
  - `fabrication_output/`: Manufacturing files
    - `bom/`: Bill of Materials
    - `gerber/`: Gerber files for PCB fabrication
    - `pnp/`: Pick and place files
  - `*.kicad_*`: KiCad project files
  - `PCB_Library.pretty/`: Custom KiCad footprints
  - `SCH_Library.kicad_sym`: Custom KiCad symbols

## Mechanic Directory (`mechanic/`)

Mechanical designs for the product enclosure, created with FreeCAD.

- `Bottom.FCStd`: Bottom case design
- `PcbBoard.FCStd`: PCB mounting design
- `PcbBoard-Body.dxf`: 2D export for manufacturing

## Documentation (`docs/`)

- `ARCHITECTURE.md`: System architecture and AT command protocol
- `BRANCH_STRATEGY.md`: Git branching guidelines
- `BRANDING.md`: Branding guidelines
- `COMMIT_STRATEGY.md`: Commit message conventions
- `COMMUNITY.md`: Community guidelines
- `CONFIGURATION.md`: Configuration instructions
- `CONTACT.md`: Contact information
- `CONTRIBUTING.md`: Contribution guidelines
- `DEVELOPMENT_GUIDE.md`: Development setup
- `FAQ.md`: Frequently asked questions
- `GETTING_STARTED.md`: Quick start guide
- `LABELLING_STRATEGY.md`: Issue labeling
- `PR_STRATEGY.md`: Pull request guidelines
- `PROJECT_BOARD.md`: Project management
- `PROJECT_STRUCTURE.md`: This file
- `SECURITY.md`: Security policy
- `STYLE_GUIDE.md`: Code style guidelines
- `SUMMARY.md`: Project summary
- `SUPPORT.md`: Support information

## Build and Development

- Firmware: Built with Cargo (Rust toolchain)
- Hardware: Fabricated using standard PCB processes
- Mechanics: Manufactured using 3D printing or CNC

For detailed setup instructions, see `docs/DEVELOPMENT_GUIDE.md`.
