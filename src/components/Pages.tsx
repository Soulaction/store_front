import {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ContextApp} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {deviceStore} = useContext(ContextApp)
    const pageCount = Math.ceil(deviceStore.totalCount / deviceStore.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={deviceStore.page === page}
                    onClick={() => deviceStore.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
