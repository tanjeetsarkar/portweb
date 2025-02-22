import Masonry from '@mui/lab/Masonry';
import { useContext, useState } from 'react';
import { PortfolioContext } from '../../App';
import { Button, Grid, Image } from "@geist-ui/core"


export const MasonrySection = () => {
    const context = useContext(PortfolioContext)


    return (
        <div>
            <Grid.Container justify="space-between">
                <Grid md={22} xs={22} style={{ textAlign: "left" }}>
                    <h2>{context && context.selectedSection && context.selectedSection.replace(/_/g, " ")}</h2>
                </Grid>
                <Grid md={2} xs={0} justify="center" alignItems="center">
                    {context &&
                        <Button
                            style={{ border: "none" }}
                            auto
                            onClick={() => context.setSelectedSection(null)}
                            placeholder="" onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}>
                            <b><u>close</u></b>
                        </Button>}
                </Grid>
                <Grid md={0} xs={2} justify="center" alignItems="center">
                    {context &&
                        <Button
                            style={{ border: "none" }}
                            auto
                            onClick={() => context.setSelectedSection(null)}
                            placeholder="" onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}>
                            <b><u>close</u></b>
                        </Button>}
                </Grid>
            </Grid.Container>
            {
                context &&
                <Masonry
                    columns={{ xs: 2, sm: 2, md: 3 }}
                    spacing={2}
                >
                    {
                        context.portfolioSections
                            .filter(section => section.caption == context.selectedSection)
                            .map(section => section.photos.map((photo, index) => {
                                const [isLoaded, setIsLoaded] = useState(false);
                                const smallImg = photo.replace(/(\.jpe?g)$/, "-small$1");

                                const handleImageLoad = () => {
                                    setIsLoaded(true);
                                };
                                return (
                                    <div key={index} style={!isLoaded ? {
                                        backgroundImage: `url(${smallImg})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                    } : {}}>
                                        <Image
                                            height={"auto"}
                                            width={"auto"}
                                            loading="lazy"
                                            src={photo}
                                            onLoad={handleImageLoad}
                                            style={{ opacity: isLoaded ? 1 : 0 }}
                                        />
                                    </div>
                                )
                            }))
                    }
                </Masonry>
            }
        </div>
    )
}