import { Bool, Field } from '../snarky.js';
export { Field, Bool };
Field.toInput = function (x) {
    return { fields: [x] };
};
Bool.toInput = function (x) {
    return { packed: [[x.toField(), 1]] };
};
//# sourceMappingURL=core.js.map