import { Button, Grid, Image, Page } from "@geist-ui/core"
import { useContext, useEffect, useRef, useState } from "react"
import { PortfolioContext } from "../../App"
import './portfolioSection.css';

export const PortfolioSection = () => {
    const context = useContext(PortfolioContext)
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("inview", entry.isIntersecting)
            }
            );
        },
            { threshold: 0.5 }
        );

        imageRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            imageRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);
    return (
        <>
            <Grid.Container justify="space-between">
                <Grid md={22} xs={22} style={{ textAlign: "left" }}>
                    <h2>{context && context.selectedSection}</h2>
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

            <Grid.Container>
                {context && context.portfolioSections
                    .filter(section => section.caption === context.selectedSection)
                    .map(section => section.photos.map((photo, index) => {

                        const [isLoaded, setIsLoaded] = useState(false);
                        const smallImg = photo.replace(/(\.jpe?g)$/, "-small$1");

                        const handleImageLoad = () => {
                            setIsLoaded(true);
                        };
                        return (
                            <Grid xs={24} key={photo} py={2}>
                                <div
                                    ref={el => imageRefs.current[index] = el}
                                    className="image-wrapper"
                                    style={!isLoaded ? {
                                        backgroundImage: `url(${smallImg})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                    } : {}}
                                >
                                    <Image
                                        height={"auto"}
                                        width={"auto"}
                                        loading="lazy"
                                        src={photo}
                                        onLoad={handleImageLoad}
                                        style={{ opacity: isLoaded ? 1 : 0 }}
                                    />
                                </div>
                            </Grid>
                        )
                    }))}
            </Grid.Container>
        </>
    )
}