import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from "react"
import { MongoClient } from "mongodb"

import Layout from "../components/layout/Layout"
import MeetupList from "../components/meetups/MeetupList"

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        address: '1 2 3 4',
        description: 'This 1'
    },
    {
        id: 'm2',
        title: 'A 2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        address: '1 2 3 4',
        description: 'This 2',
    }
]

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([])

    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS)
    // }, [])

    return (
        <React.Fragment>
            <Head>
                <title>React meetups</title>
            </Head>
            <MeetupList meetups={props.meetups} />
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://alan:alan@cluster0.3m1inti.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
                description: meetup.description,
            }))
        },
        revalidate: 1
    }
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage