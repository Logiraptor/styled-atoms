import * as React from 'react';
import { expect, shallow } from './helper';
import { Styled } from '../src'

const styles = {
    class1: "class1",
    class2: "class2",
    class3: "class3",
    class4: "class4",
}

describe('Styled.atom', () => {
    it('renders the provided element', () => {
        let Atoms = new Styled(styles);
        let Button = Atoms.atom("button", null, {});
        let component = shallow(<Button />)
        expect(component).to.containMatchingElement(<button />);
    });

    it('adds classes in the provided structure', () => {
        let Atoms = new Styled(styles);
        let Button = Atoms.atom("button", null, {
            class1: true,
        });
        let component = shallow(<Button />)
        expect(component).to.containMatchingElement(<button className="class1" />);
    })

    it('does not add classes with falsey conditions', () => {
        let Atoms = new Styled(styles);
        let Button = Atoms.atom("button", null, {
            class1: true,
            class2: false,
            class3: true
        });
        let component = shallow(<Button />)
        expect(component).to.containMatchingElement(<button className="class1 class3" />);
    });

    it('passes down props to the native element', () => {
        let Atoms = new Styled(styles);
        let Image = Atoms.atom("img", null, {});
        let component = shallow(<Image width={100} />)
        expect(component).to.containMatchingElement(<img width={100} />);
    });

    it('allows custom props with computed classes', () => {
        let Atoms = new Styled(styles);
        let Image = Atoms.atom("img", { primary: true }, {
            class1: true,
            class2: x => x.primary
        });
        let component = shallow(<Image width={100} primary />)
        expect(component).to.containMatchingElement(<img width={100} className="class1 class2" />);

        component = shallow(<Image width={100} primary={false} />)
        expect(component).to.containMatchingElement(<img width={100} className="class1" />);
    });

    it('uses defaults as defaultProps values', () => {
        let Atoms = new Styled(styles);
        let Image = Atoms.atom("img", { primary: true }, {
            class1: true,
            class2: x => x.primary
        });
        let component = shallow(<Image width={100} />)
        expect(component).to.have.prop('primary', true)
    });

    it('ignores classes with undefined conditions', () => {
        let Atoms = new Styled(styles);
        let Image = Atoms.atom("img", { primary: true }, {
            class1: undefined
        });
        let component = shallow(<Image />)
        expect(component).to.containMatchingElement(<img className="" />);
    });
});
