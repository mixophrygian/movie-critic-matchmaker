/* LikeCarousel (c) 2019 Simone P.M. github.com/simonepm - Licensed MIT */

import { recordUserChoice } from '../_helpers/utils.ts'
import MovieCard from "../components/MovieCard.svelte"

import { completedChoices, randomMovies, secondTimeThrough } from '../stores.js'

let randomMoviesValue

const unsubscribe = randomMovies.subscribe(value => {
    randomMoviesValue = value;
});
export class Carousel {
    constructor(element) {
        this.board = element
        randomMoviesValue.forEach(async movie => {
            this.push(movie)
        })

        // handle gestures
        this.handle()
    }

    handle() {
        // list all cards
        this.cards = this.board.querySelectorAll(".frame")

        // get top card
        this.topCard = this.cards[this.cards.length - 1]

        // get next card
        this.nextCard = this.cards[this.cards.length - 2]

        // if at least one card is present
        if (this.cards.length > 0) {
            // set default top card position and scale
            this.topCard.style.transform =
                "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)"

            // destroy previous Hammer instance, if present
            if (this.hammer) this.hammer.destroy()

            // listen for tap and pan gestures on top card
            this.hammer = new Hammer(this.topCard)
            this.hammer.add(new Hammer.Tap())
            this.hammer.add(
                new Hammer.Pan({
                    position: Hammer.position_ALL,
                    threshold: 0,
                })
            )

            // pass events data to custom callbacks
            this.hammer.on("tap", (e) => {
                this.onTap(e)
            })
            this.hammer.on("pan", (e) => {
                this.onPan(e)
            })
        }
    }

    onTap(e) {
        // get finger position on top card
        let propX =
            (e.center.x - e.target.getBoundingClientRect().left) /
            e.target.clientWidth

        // get rotation degrees around Y axis (+/- 15) based on finger position
        let rotateY = 15 * (propX < 0.05 ? -1 : 1)

        // enable transform transition
        this.topCard.style.transition = "transform 100ms ease-out"

        // apply rotation around Y axis
        this.topCard.style.transform =
            "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(" +
            rotateY +
            "deg) scale(1)"

        // wait for transition end
        setTimeout(() => {
            // reset transform properties
            this.topCard.style.transform =
                "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)"
        }, 100)
    }

    onPan(e) {
        if (!this.isPanning) {
            this.isPanning = true

            // remove transition properties
            this.topCard.style.transition = null
            if (this.nextCard) this.nextCard.style.transition = null

            // get top card coordinates in pixels
            let style = window.getComputedStyle(this.topCard)
            let mx = style.transform.match(/^matrix\((.+)\)$/)
            this.startPosX = mx ? parseFloat(mx[1].split(", ")[4]) : 0
            this.startPosY = mx ? parseFloat(mx[1].split(", ")[5]) : 0

            // get top card bounds
            let bounds = this.topCard.getBoundingClientRect()

            // get finger position on top card, top (1) or bottom (-1)
            this.isDraggingFrom =
                e.center.y - bounds.top > this.topCard.clientHeight / 2 ? -1 : 1
        }

        // get new coordinates
        let posX = e.deltaX + this.startPosX
        let posY = e.deltaY + this.startPosY

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / this.board.clientWidth
        let propY = e.deltaY / this.board.clientHeight

        // get swipe direction, left (-1) or right (1)
        const SWIPE_LEFT = -1
        const SWIPE_RIGHT = 1

        let dirX = e.deltaX < 0 ? SWIPE_LEFT : SWIPE_RIGHT

        // get degrees of rotation, between 0 and +/- 45
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45

        // get scale ratio, between .95 and 1
        let scale = (95 + 5 * Math.abs(propX)) / 100

        // move and rotate top card
        this.topCard.style.transform =
            "translateX(" +
            posX +
            "px) translateY(" +
            posY +
            "px) rotate(" +
            deg +
            "deg) rotateY(0deg) scale(1)"

        // scale up next card
        if (this.nextCard)
            this.nextCard.style.transform =
                "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(" +
                scale +
                ")"

        if (e.isFinal) {
            this.isPanning = false

            let successful = false

            // set back transition properties
            this.topCard.style.transition = "transform 200ms ease-out"
            if (this.nextCard)
                this.nextCard.style.transition = "transform 100ms linear"

            // check threshold and movement direction
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
                successful = true
                // get right border position
                posX = this.board.clientWidth
            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
                successful = true
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth)
            } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
                successful = true
                // get top border position
                posY = -(this.board.clientHeight + this.topCard.clientHeight)
            }

            if (successful) {
                if (this.topCard.querySelector('.movieTitle')) {
                    const title = this.topCard.querySelector('.movieTitle').innerHTML
                    recordUserChoice(e.direction, title)
                }
                this.topCard.style.transform =
                    "translateX(" +
                    posX +
                    "px) translateY(" +
                    posY +
                    "px) rotate(" +
                    deg +
                    "deg)"

                // wait transition end
                setTimeout(() => {
                    // remove swiped card
                    this.board.removeChild(this.topCard)
                    if (!this.board.firstChild) {
                        // calculate results
                        completedChoices.update(() => true)
                    }
                    // handle gestures on new top card
                    this.handle()
                }, 200)
            } else {
                // reset cards position and size
                this.topCard.style.transform =
                    "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)"
                if (this.nextCard)
                    this.nextCard.style.transform =
                        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)"
            }
        }
    }



    push(movie) {
        //create a wrapper component to append a MovieCard component to
        let card = document.createElement("div")
        card.classList.add("frame")

        // add it to the DOM so MovieCard can find it
        this.board.insertBefore(card, this.board.firstChild)
        const movieCard = new MovieCard({ target: document.querySelector(".frame"), props: { title: movie.title } })

        //remove the wrapper
        this.board.removeChild(this.board.firstChild)

        //add poster image to MovieCard
        card.firstChild.firstChild.style.backgroundImage =
            "url('" + movie.poster + "')"


        //and add the MovieCard child by itself
        this.board.insertBefore(card.firstChild, this.board.firstChild)

    }
}