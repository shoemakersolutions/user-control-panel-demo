export const formInputObjectParser = (object, keyArray, maxLength, value, level = 0) => {
    return {
        ...object,
        [keyArray[level]]:
            level < maxLength
                ? formInputObjectParser({ ...object[keyArray[level]] }, keyArray, maxLength, value, level + 1)
                : value,
    }
};
