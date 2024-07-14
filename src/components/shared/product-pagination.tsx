import { Box, Button, ButtonSpinner } from "@chakra-ui/react";

interface I {
    before: () => void;
    after: () => void;
    pageAmount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductPagination({before, after, pageAmount, currentPage, setCurrentPage} : I){
    const buttons :number[] = []

    if(currentPage > 1) {
        for(let i = currentPage + -1; i < currentPage + 4  && i <= pageAmount; i++) {
            buttons.push(i)
        }
    }
    else if(currentPage <= 1) {
        for(let i = 1; i < 6 && i <= pageAmount; i++) {
            buttons.push(i)
        }
    }

    return <Box className="p-2 mt-3" border={''}>
        <div className="flex justify-center gap-3 items-center">
            <Button onClick={() => before()}>Before</Button>
            <div className="flex gap-1">
                {buttons.map((value, index) => (
                    <div key={index}>
                        <Button variant={currentPage == value - 1 ? 'solid' : 'outline'} onClick={() => {
                            setCurrentPage(value - 1)
                        }}>{value}</Button>
                    </div>
                ))}
            </div>
            <Button onClick={() => after()}>After</Button>
        </div>
    </Box>
}