# hover-image-hover-outside

**hover-image-hover-outside** is a lightweight JavaScript package that enables image zoom and hover effects outside the image container. It is ideal for product galleries, portfolios, and any scenario where you want to provide a detailed view of images on hover without cluttering the original layout.

## Features

-    Zoomed image appears outside the original image boundary
-    Customizable zoom area and position
-    Easy integration with any frontend framework or plain HTML/JS
-    Minimal dependencies and fast performance

## Installation

```bash
npm install hover-image-hover-outside
```

or

```bash
yarn add hover-image-hover-outside
```

## Usage

```js
import { hoverImageOutside } from "hover-image-hover-outside";

hoverImageOutside(document.querySelector(".zoom-image"), {
     zoomArea: "right", // or 'left', 'top', 'bottom'
     zoomScale: 2,
});
```

**HTML Example:**

```html
<img class="zoom-image" src="your-image.jpg" alt="Zoomable" />
```

## Options

| Option    | Type   | Default | Description                                 |
| --------- | ------ | ------- | ------------------------------------------- |
| zoomArea  | string | right   | Position of zoomed image (right, left, etc) |
| zoomScale | number | 2       | Magnification scale                         |
| offset    | number | 10      | Space between original and zoomed image     |

## Demo

Below is a demo image showing the hover effect in action:

<img src="/public/demo-screenshot.png" alr="Demo Image">
