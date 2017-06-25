# Styled Atoms

This package is an alternative to things like styled-components, but _specially tailored_ for people using webpack + typescript.

Using `css-loader`, you can get import css into your javascript, and with `typings-for-css-modules-loader`, you can get type definitions generated
for your css. What `styled-atoms` allows you to do is create type safe, reusable 'atoms' for your ui. See the example:

```

import * as style from './main.css';
import { Styled } from 'styled-atoms'

const Atom = new Styled(style).atom;

export const Button = Atom("button", { primary: false }, {
    btn: true,
    primary: x => x.primary
})

```

This code gives you a react component called Button that can be used like so:

```
<Button />
<!--<button class="btn" />-->

<Button primary />
<!--<button class="btn primary"/>-->

<Button primary={false} />
<!--<button class="btn"/>-->

<Button> Press Me </Button>
<!--<button class="btn">Press Me</button>-->
```

Plus, if you're using typescript, it's completely typesafe. Meaning you'll get compile time errors if you typo a css class name.

