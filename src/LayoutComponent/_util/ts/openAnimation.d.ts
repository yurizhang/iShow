// declare const animation: {
//     enter(node: HTMLElement, done: () => void): any;
//     leave(node: HTMLElement, done: () => void): any;
//     appear(node: HTMLElement, done: () => void): any;
// };
// export default animation;
declare const animation: {
    enter(node, done: () => void);
    leave(node, done: () => void);
    appear(node, done: () => void);
};
export default animation;
