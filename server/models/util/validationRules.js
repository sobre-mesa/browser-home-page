
const aOrAn = (x) => `${ x.match('^[aieouAIEOU].*') ? 'an' : 'a' } ${x}`;

exports.required =
 (object, attribute) => {
    const text = `${aOrAn(object)} must have ${aOrAn(attribute)}`;
    return { required: [true, text] };
 }



exports.charMinMax = (object, attribute, min, max) => {
    const cantBe = `${aOrAn(object)}'s ${attribute} cant be` 
    let minlength = [min, `${cantBe} shorter than ${min} chars`];
    let maxlength = [max,`${cantBe} longer than ${max} chars`];
    return { minlength, maxlength };
}
