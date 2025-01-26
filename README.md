# Balestra Reusable Components

**Balestra Reusable Components** is a lightweight React library offering simple, reusable components to speed up development and provide consistent UI features across your projects. Whether you need an accordion, star rating, image slider, or other utilities, this library provides a solid foundation for your React applications.

## Features

- **Reusable Components**: Easy-to-use components for common UI needs.
- **Customizable**: Adjust styles and behaviors via props to match your design system.
- **Lightweight**: Minimal dependencies for quick integration and performance.
- **TypeScript Support**: Includes type definitions for better development experience.

## Installation

Install the library using NPM or Yarn:

```bash
npm install balestra-reusable-components
```

or

```bash
yarn add balestra-reusable-components
```

## Usage

### Accordion Component

The `Accordion` component provides a simple collapsible interface for displaying content in sections. It supports dynamic rendering for any type of data.

#### Example

```tsx
import React from "react";
import { Accordion } from "balestra-reusable-components";

const data = [
  { id: "1", title: "What is React?", content: "A JavaScript library for building UIs." },
  { id: "2", title: "What is Vite?", content: "A fast build tool for modern web projects." },
];

const App = () => {
  return (
    <div>
      <h1>Dynamic Accordion Example</h1>
      <Accordion
        data={data}
        getId={(item) => item.id}
        renderTitle={(item) => <h3>{item.title}</h3>}
        renderContent={(item) => <p>{item.content}</p>}
      />
    </div>
  );
};

export default App;
```

#### Props

| Prop            | Type                 | Description                                                                         |
|------------------|----------------------|-------------------------------------------------------------------------------------|
| `data`          | `Array<any>`         | Required. An array of items to display in the accordion. Each item must have an `id`. |
| `getId`         | `(item: any) => string` | Required. A function to extract the `id` from each item.                            |
| `renderTitle`   | `(item: any) => ReactNode` | Required. A function to define how the title of each item is rendered.             |
| `renderContent` | `(item: any) => ReactNode` | Required. A function to define how the content of each item is rendered.           |

#### Example Data Format

```javascript
const data = [
  { id: "1", title: "What is React?", content: "A JavaScript library for building UIs." },
  { id: "2", title: "What is Vite?", content: "A fast build tool for modern web projects." },
];
```

### Star Rating Component

The `StarRating` component allows users to rate items using a customizable star-based rating system. It supports both internal state management and controlled state from a parent component.

#### Example

```tsx
import React, { useState } from "react";
import { StarRating } from "balestra-reusable-components";

const App = () => {
  const [rating, setRating] = useState(3); // Controlled state

  const handleRate = (newRating: number) => {
    console.log(`Rated: ${newRating}`);
    setRating(newRating); // Update state when the user clicks a star
  };

  return (
    <div>
      <h1>Controlled Star Rating</h1>
      <StarRating 
        rate={rating} 
        onRate={handleRate} 
        numberOfStars={5} 
        size={30} 
      />

      <h1>Uncontrolled Star Rating</h1>
      <StarRating numberOfStars={5} size={30} />
    </div>
  );
};

export default App;
```

#### Props

| Prop             | Type                  | Default      | Description                                                                           |
|-------------------|-----------------------|--------------|---------------------------------------------------------------------------------------|
| `numberOfStars`   | `number`             | `10`         | The total number of stars to display.                                                 |
| `size`           | `number`             | `40`         | The size of each star in pixels.                                                     |
| `defaultColor`    | `string`             | `#e4e5e9`    | The color of the stars when they are not highlighted.                                |
| `highlighColor`   | `string`             | `#ffc107`    | The color of the stars when they are highlighted.                                    |
| `rate`           | `number`             | `undefined`  | The current rating value (for controlled components).                                |
| `onRate`          | `(rating: number) => void` | `undefined`  | Callback function triggered when a star is clicked.                                  |
| `onHover`         | `(hoverRating: number) => void` | `undefined` | Callback function triggered when a star is hovered over.                             |
| `onHoverLeave`    | `() => void`         | `undefined`  | Callback function triggered when the mouse leaves the star area.                     |

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make changes and commit: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Support

If you encounter any issues, feel free to open an issue on the [GitHub repository](https://github.com/your-username/balestra-reusable-components) or contact the maintainer directly.

---

Start building beautiful React applications with **Balestra Reusable Components** today!