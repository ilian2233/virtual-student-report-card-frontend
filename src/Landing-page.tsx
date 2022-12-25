import React from 'react'
import {Card, CardContent, Grid, Paper, Typography} from "@mui/material";

const CardDisplay = (props: { title: string, cards: { cardTitle: string, cardBody: string }[] }) => <Grid
    item
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={3}
>
    <Grid item xs={12}>
        <Paper sx={{width: "80vw"}}>
            <Typography gutterBottom variant="h4" component="div">
                {props.title}
            </Typography>
        </Paper>
    </Grid>
    <Grid item container xs={12} direction="row" spacing={3}>
        {props.cards.map(c => <Grid item xs={6}>
            <Card sx={{width: "fit-content"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {c.cardTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {c.cardBody}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>)}
    </Grid>
</Grid>
const LandingPage = () => <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={3}
    marginTop="10vh"
>
    <Grid item xs={12}>
        <img src="https://www1.tu-varna.bg/tu-varna/images/za_nas/60g_tu/60gTU.jpg"
             alt="60 years tu banner"/>
    </Grid>
    <Grid
        container
        item
        xs={12}
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="90vw"
    >
        <CardDisplay title="News" cards={[
            {
                cardTitle: "Take The Stress Out Of BEST UNIVERSITY",
                cardBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                cardTitle: "The Secret of BEST UNIVERSITY",
                cardBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Vitae suscipit tellus mauris a diam maecenas sed enim. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Gravida arcu ac tortor dignissim convallis aenean. Quam id leo in vitae turpis massa sed elementum tempus. Etiam tempor orci eu lobortis elementum. Feugiat nisl pretium fusce id velit ut tortor. Id aliquet lectus proin nibh nisl condimentum id venenatis. Aliquam malesuada bibendum arcu vitae elementum curabitur. Curabitur vitae nunc sed velit dignissim sodales ut."
            },
            {
                cardTitle: "Who Else Wants To Be Successful With BEST UNIVERSITY",
                cardBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Tellus in hac habitasse platea dictumst vestibulum. Consequat mauris nunc congue nisi vitae suscipit. Lacinia quis vel eros donec ac odio tempor orci. Enim ut tellus elementum sagittis vitae. Vulputate odio ut enim blandit. Enim facilisis gravida neque convallis a cras semper auctor neque. Eleifend donec pretium vulputate sapien nec sagittis. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan."
            },
            {
                cardTitle: "How I Improved My BEST UNIVERSITY In One Easy Lesson",
                cardBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim convallis. Ultricies tristique nulla aliquet enim tortor at. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Est lorem ipsum dolor sit amet consectetur adipiscing. Tellus id interdum velit laoreet id. Sed augue lacus viverra vitae congue eu consequat. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Ut ornare lectus sit amet est. Scelerisque purus semper eget duis at tellus at. Sit amet cursus sit amet dictum. Et netus et malesuada fames ac turpis. Sed lectus vestibulum mattis ullamcorper velit. Tempus urna et pharetra pharetra massa massa ultricies. Egestas tellus rutrum tellus pellentesque. Fermentum posuere urna nec tincidunt praesent. Nulla aliquet enim tortor at. Ultrices gravida dictum fusce ut."
            },
            {
                cardTitle: "3 Things Everyone Knows About BEST UNIVERSITY That You Don't",
                cardBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum. Cursus eget nunc scelerisque viverra mauris in aliquam. Adipiscing tristique risus nec feugiat in fermentum posuere. Ultricies leo integer malesuada nunc vel risus commodo viverra. Eget egestas purus viverra accumsan in nisl. Urna id volutpat lacus laoreet non curabitur gravida. Erat velit scelerisque in dictum non consectetur. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Velit euismod in pellentesque massa placerat. Tristique magna sit amet purus gravida quis blandit. In hac habitasse platea dictumst. At elementum eu facilisis sed odio morbi quis commodo. Justo eget magna fermentum iaculis eu non. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Amet nulla facilisi morbi tempus iaculis. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim."
            },
        ]}/>
    </Grid>
</Grid>

export default LandingPage;
