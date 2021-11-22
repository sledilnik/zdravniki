import { MainScrollTop as ScrollTop } from 'components/Shared/ScrollTop';
import { DOCTORS } from 'const';
import { Loader } from 'components/Shared';
import Doctors from 'components/Doctors';
import { doctorsContext, leafletContext } from 'context';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function Home() {

    const Main = styled(Box)(({ theme }) => ({
        overflow: 'hidden',
        backgroundColor: theme.customColors.background,
    }));

    const { isFetching, errors } = doctorsContext.useDoctors();
    const hasError = errors.some(error => error instanceof Error);

    if (hasError) {
        return <div>Nekaj je narobe!</div>;
    }

    return (
        <div>
            <Toolbar id="back-to-top-anchor" />
            {isFetching && !hasError ? (
                <Loader.Center />
            ) : (
                <>
                    {/* <Filters /> */}
                    <Main id="main-content" component="main">
                        <leafletContext.LeafletProvider>
                            <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
                        </leafletContext.LeafletProvider>
                    </Main>
                </>
            )}
            <ScrollTop />
        </div>
    )
}