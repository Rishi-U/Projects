import Rendering from "./RenderingImage";

export default function SubSection({ id, item, items }) {
    const currentItem = item[id];
    console.log(id)
    console.log(currentItem)
    console.log(item)

    return (
        <>
            <div>
                {currentItem.childID.map((childId) => (
                    <Rendering key={childId} id={childId} item={item} />
                ))}
            </div>
        </>
    );
}