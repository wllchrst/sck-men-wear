
export default function useFetchPopularCategories(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function getAll() {
        try {
            const q = query(categoryCollection);

            const unsubscribe = onSnapshot(q, (snapshot) => {
                if (snapshot.docs[0] != undefined) {
                    setCategories(snapshot.docs.map((doc) => doc.data()) as Category[]);
                    setIsLoading(false);
                } else {
                    setCategories([]);
                    setIsLoading(false);
                }
            });

            // Clean up the listener when component unmounts
            return unsubscribe;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    return { categories, isLoading };
}