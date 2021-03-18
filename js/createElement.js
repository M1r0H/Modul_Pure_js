export const createElement = (element, type, typeName) => {
    const name = document.createElement(element);
    name.setAttribute(type, typeName);
    return name;
};