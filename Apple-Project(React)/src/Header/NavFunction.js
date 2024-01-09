import Navigation from './NavigationFunction2.js'

export default function Nav({ id, item }) {
    const currentItem = item[id];
    const childIDs = currentItem.childID;

    return (
        <ul className="global-menu">
            <li className={currentItem.class}>
                <div className="super-category">
                    {currentItem.title}
                </div>
            </li>
            <li className={"dropdown"}>
                {childIDs.length > 0 && (
                    <ul className={`sub-dropdown`}>
                        <li className="resub-dropdown">
                            {childIDs.map((childId) => (
                                <Navigation
                                    key={childId}
                                    id={childId}
                                    item={item}
                                />
                            ))}
                        </li>
                    </ul>
                )}
            </li>
        </ul>
    );
}
