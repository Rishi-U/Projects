export default function Rendering({ id, item }) {
    const currentData = item[id];

    return (
        <>
            <div>
                {currentData && currentData.URL && (
                    <img src={currentData.URL} alt="" width={"100%"} />
                )}
            </div>
        </>
    );
}