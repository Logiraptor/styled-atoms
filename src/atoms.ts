import * as React from 'react';

export type TagName = keyof ElementTagNameMap;
export type TagProps<K extends TagName> = React.HTMLProps<ElementTagNameMap[K]>

export type Condition<T> = boolean | ((props: T) => boolean)

export type ConditionalClassList<K extends TagName, T extends TagProps<K>, ClassName extends string> = {
    [key in ClassName]?: Condition<T>;
}

export class Styled<Style, ClassName extends keyof Style> {

    constructor(private style: Style) { }

    atom<K extends TagName, CustomProps, Props extends CustomProps & TagProps<K>>(elem: K, defaults: CustomProps, classes: ConditionalClassList<TagName, Props, ClassName>): React.ComponentClass<Partial<Props>> {
        const style = this.style;
        const Component = class extends React.Component<Partial<Props>, {}> {
            static defaultProps = defaults;

            render() {
                // // Object.keys loses type information so we have to assert here
                let relevantClassNames = Object.keys(classes) as (ClassName)[]
                let matchingClassNames: (ClassName)[] = relevantClassNames.filter(x => {
                    let strategy = classes[x];
                    if (typeof strategy === 'boolean') {
                        return strategy;
                    } else if (typeof strategy !== 'undefined') {
                        return strategy(this.props);
                    }
                })
                let computedClassName = matchingClassNames.map(x => style[x]).join(" ")
                let computedProps = Object.assign({}, this.props, { className: computedClassName })
                return React.createElement(elem, computedProps)
            }
        }
        return Component
    }
}
