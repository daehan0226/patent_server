
interface IConvertInt {
    value: any;
    defaultValue: number;
}

const convertInt = ({value, defaultValue}:IConvertInt):number => {
    const valueInt = parseInt(value, 10);
    if (Number.isNaN(valueInt)) {
        return defaultValue
    } return valueInt
}


export { convertInt };
