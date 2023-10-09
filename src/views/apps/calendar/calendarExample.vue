<template>
  <div id="app">
    <p>Google Calendar API Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button id="authorize_button" style="display: none">Authorize</button>
    <button id="signout_button" style="display: none">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap"></pre>
  </div>
</template>

<script>
const CLIENT_ID = process.env.MIX_CLIENT_ID_GOOGE_CALENDAR;
const API_KEY = process.env.MIX_API_KEY_GOOGE_CALENDAR;

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES =
  "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.addons.execute";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

export default {
  data() {
    return {
      items: undefined,
      api: undefined,
      authorized: false,
      authorizeButton: document.getElementById("authorize_button"),
      signoutButton: document.getElementById("signout_button"),
    };
  },

  created() {
    this.api = gapi;
    this.handleClientLoad();
  },

  methods: {
    handleClientLoad() {
      this.api.load("client:auth2", this.initClient);
    },

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
      this.api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          () => {
            // Listen for sign-in state changes.
            this.api.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(
              this.api.auth2.getAuthInstance().isSignedIn.get()
            );

            document.getElementById("authorize_button").onclick =
              this.handleAuthClick;
            document.getElementById("signout_button").onclick =
              this.handleSignoutClick;
          },
          (error) => {
            this.appendPre(JSON.stringify(error, null, 2));
          }
        );
    },

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        document.getElementById("authorize_button").style.display = "none";
        document.getElementById("signout_button").style.display = "block";
        this.listUpcomingEvents();
      } else {
        document.getElementById("authorize_button").style.display = "block";
        document.getElementById("signout_button").style.display = "none";
      }
    },

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick(event) {
      this.api.auth2.getAuthInstance().signIn();
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick(event) {
      this.api.auth2.getAuthInstance().signOut();
    },

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(message) {
      var pre = document.getElementById("content");
      var textContent = document.createTextNode(message + "\n");
      pre.appendChild(textContent);
    },

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    listUpcomingEvents() {
      this.api.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then((response) => {
          var events = response.result.items;
          this.appendPre("Upcoming events:");

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              this.appendPre(event.summary + " (" + when + ")");
            }
          } else {
            this.appendPre("No upcoming events found.");
          }
        });
    },
  },
};
</script>

<style>
body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1em;
}

.authentification {
  margin: 20px;
  text-align: center;
}

hr {
  border: 1px solid black;
  margin: 30px;
}

pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
  overflow-x: auto;
}

.string {
  color: green;
}

.number {
  color: purple;
}

.boolean {
  color: blue;
}

.null {
  color: magenta;
}

.key {
  color: black;
}
</style>