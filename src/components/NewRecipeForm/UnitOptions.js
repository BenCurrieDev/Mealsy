
const unitOptionsList = [
    '',
    'ml',
    'l',
    'cup',
    'tsp',
    'tbsp',
    'g',
    'kg',
    'cube',
    'clove',
    'serving'
]

const UnitOptions = () => {
    return (
        <datalist id="unitOptions">
            {unitOptionsList.map((unit, index) => {
                return <option key={index} value={unit} />
            })}
        </datalist>
    )
}

export default UnitOptions;