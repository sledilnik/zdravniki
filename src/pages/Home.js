import { DOCTORS, SIZES } from 'const';
import { Loader } from 'components/Shared';
import Doctors from 'components/Doctors';
import { doctorsContext, leafletContext } from 'context';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Filters from 'components/Filters';

export default function Home() {

    const Wrapper = styled('div')(({ theme }) => ({
        height: '100vh',
        overflow: 'hidden',
    }));

    const Main = styled(Box)(({ theme }) => ({
        overflow: 'hidden',
        backgroundColor: theme.palette.common.white,
        '& .leaflet-container': {
            height: SIZES.MAP_HEIGHT.default,
        },
        [theme.breakpoints.up('sm')]: {
            '& .leaflet-container': {
                height: SIZES.MAP_HEIGHT.upSmall,
            },
        },
        [theme.breakpoints.up('md')]: {
            '& .leaflet-container': {
                height: 'clamp(400px, 100%, 100vh)', // ? not sure but it's working
            },
        },
    }));

    const { isFetching, errors } = doctorsContext.useDoctors();
    const hasError = errors.some(error => error instanceof Error);

    if (hasError) {
        return <div>Nekaj je narobe!</div>;
    }

    return (
        <Wrapper>
            {isFetching && !hasError ? (
                <Loader.Center />
            ) : (
                <>
                    <Filters />
                    <Main id="main-content" component="main">
                        <leafletContext.LeafletProvider>
                            <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
                        </leafletContext.LeafletProvider>
                    </Main>
                </>
            )}
        </Wrapper>
    )
}