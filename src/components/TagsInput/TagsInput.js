
import TagOptions from "./TagOptions";

function TagsInput({setTags, setTagsInput, tagsInput, tags}) {

    function handleKeyDown(e) {
        console.log("handleKeyDown: ", e.key, e.code);
       
        if (e.key !== 'Enter') return;

        e.preventDefault();
        
        if (!tagsInput) return;
        setTags([...tags, tagsInput]);
        setTagsInput('');
    }

    function removeTag(index) {
        setTags(tags.filter((tag, i) => i !== index));
    }

    function handleChange(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setTagsInput(e.target.value);
    }
        
    

    return (
        <div className="border rounded shadow-sm p-1 flex items-center flex-wrap bg-white w-64">
            { tags.map((tag, index) => (
                <div className="bg-gray-300 inline-block px-2 py-1 rounded mr-1 mb-1" key={index}>
                    <span className="text-sm text-gray-700">{tag}</span>
                    <span onClick={() => removeTag(index)} className="cursor-pointer ml-1 inline-flex content-center items-center">&times;</span>
                </div>
            ))
            }
            <input onChange={handleChange} onKeyDown={handleKeyDown} type="text"  value={tagsInput} placeholder="Add tag..." list="tagOptions" className="flex-grow px-1 text-xs outline-none border-none shadow-none" enterkeyhint="enter"/>
            <TagOptions />
        </div>
    )
}

export default TagsInput;