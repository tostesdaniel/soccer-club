import { expect } from 'chai';

const checkPropertyExists = (instance: object) => (propName: string) => {
  it(`${propName}`, () => {
    expect(instance).to.have.property(propName);
  });
};

export default checkPropertyExists;
