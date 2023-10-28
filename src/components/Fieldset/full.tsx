type PropsType = {
    data: {
        label:string,
        placeholder:string,
        name:string,
        type:string
    } 
}

export default function Fieldset({data}:PropsType){
    return (
        <fieldset className="w-full p-2">
            <label htmlFor="">{data.label}</label>
            <input type={data.type} className="w-full p-2 text-black outline-none border " placeholder={data.placeholder} name={data.name}/>
        </fieldset>
    )
}