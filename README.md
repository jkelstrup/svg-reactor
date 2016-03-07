![svg-reactor logo](logo@2x.png)

# SVG-REACTOR
A tool to convert SVG-files to React components.

## Installation
```sh
$ [sudo] npm install -g svg-reactor
```

## Usage
```sh
svg-reactor [options] <svg-file>
```

#### Options:
```sh
-h, --help     output usage information
-V, --version  output the version number
-D, --delete   delete the original SVG file
```

## Example
*my-svg-file.svg:*
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
  <path fill="none" stroke="currentColor" stroke-width="2" d="M1 8h16M1 1h16M1 15h16" stroke-linecap="square"/>
</svg>
```
Run it through *svg-reactor*:
```sh
$ svg-reactor my-svg-file.svg
```
This will create a React component in the current directory:
```sh
MySvgFile
  ∟ index.js
```
*MySvgFile/index.js:*
```js
import React from 'react'

const MySvgFile = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='16' viewBox='0 0 18 16'>
    <path fill='none' stroke='currentColor' strokeWidth='2' d='M1 8h16M1 1h16M1 15h16' strokeLinecap='square'/>
  </svg>

)

export default MySvgFile
```

### Deleting original SVG file
Adding the `-D`-flag will delete the original SVG-file on successful creation of the react component. Beware that this is an irreversible deletion.

## Bugs, issues etc.
Feel free to [open an issue](https://github.com/jkelstrup/svg-reactor/issues/new) or create a pull request.

## License
[MIT](LICENSE)
