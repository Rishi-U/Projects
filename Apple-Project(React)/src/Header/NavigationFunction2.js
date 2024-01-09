export default function Navigation({ id, item }) {
    const currentItem = item[id];
    const childIDs = currentItem.childID;

    return (
        <div className={`${currentItem.subclass}`}>
            <h2 className={currentItem.class}>
                {currentItem.title}
            </h2>
            {childIDs.length > 0 && (
                <ul className="resub-category">
                    {childIDs.map((childId) => (
                        <li className={`${item[childId].class}`}>
                            <a className="link" href="">
                                {item[childId].title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
