<p align="center">
  <img width="250" src=".github/logo.svg?v=1" alt="Tatva Logo" />
</p>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgZmlsbD0idHJhbnNwYXJlbnQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIvPjxnPjxwYXRoIGQ9Ik0xOSAxM3Y2YzAgMS4xMDUtLjg5NSAyLTIgMkg1Yy0xLjEwNSAwLTItLjg5NS0yLTJWN2MwLTEuMTA1Ljg5NS0yIDItMmg2djJINXYxMmgxMnYtNmgyek0xMyAzdjJoNC41ODZsLTcuNzkzIDcuNzkzIDEuNDE0IDEuNDE0TDE5IDYuNDE0VjExaDJWM2gtOHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+)](https://tatva.lubus.in/)

## Overview
### A Sanskrit word, "तत्त्व", meaning "Element", is a Library of custom HTML elements.
A set of custom HTML elements / Web Components to power various functionality for our projects. Powering functionality for our WordPress Blocks and Formats plugins.

## Elements

Tatva provides a set of easy-to-use web components that work with any framework:

| Element         | Description                                |
|----------------|--------------------------------------------|
| `tatva-marker`  | Highlight/underline animation for text     |
| `tatva-pulse`   | Pulsing indicator for labels/badges        |
| `tatva-text`    | Text reveal and animation effects          |
| `tatva-compare` | Image comparison (before/after) slider     |
| `tatva-infotip` | Small tooltip / infotip component          |


## Requirements

Tatva uses Floating UI internally to power advanced and reliable element positioning (for example, in components like `tatva-infotip`):

```html
<script src="https://cdn.jsdelivr.net/npm/@floating-ui/core@1.7.3"></script>
<script src="https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.3"></script>
````

## Installation

#### via CDN

```html
<script type="module" src="https://unpkg.com/@lubusin/tatva/dist/index.js"></script>
```

#### via NPM

```bash
npm install @lubusin/tatva
```

## Usage

#### Load All Components

```js
// main.js
import '@lubusin/tatva/src/elements/index.js';
```

#### Load a Single Component

```js
import '@lubusin/tatva/src/elements/tatva-marker.js';
```

## Examples

#### Marker

```html
<tatva-marker type="underline" color="#dc143c" animation animation-duration="5s">
  Highlighted text
</tatva-marker>
```

#### Pulse

```html
<tatva-pulse 
  position="superscript" 
  size="0.75rem" 
  color="#1e90ff" 
  gap="8px" 
  superscript-offset="-0.5em"
>
  Pro
</tatva-pulse>
```

## Meet Your Artisans

[LUBUS](http://lubus.in) is a web design agency based in Mumbai.

<a href="https://cal.com/lubus">
<img src="https://raw.githubusercontent.com/lubusIN/.github/refs/heads/main/profile/banner.png" />
</a>

## License

Tatva is open-sourced licensed under the [MIT License](LICENSE).
