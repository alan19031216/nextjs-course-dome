import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        router.push('/')
    }

    return (
        <React.Fragment>
            <Head>
                <title>New meetups</title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </React.Fragment>
    )
}

export default NewMeetupPage;