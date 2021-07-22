////////////////////////////////////////////////////////////////////////////
// MODELS
////////////////////////////////////////////////////////////////////////////

/**
 * @tableName : proofs
 * @description : Représente une preuve d'un challenge dans une gamelist
 */
interface Proof {
    id: number
    creator: Player
    is_closed: boolean
    closed_date: string | null
    challenge_gamelist?: ChallengeGameList
    achievers: Player[]
    media: Media
    stats?: ProofStatistics
}

/**
 * @tableName : gamelists
 * @description : Représente une gamelist
 */
interface GameList {
    id: number
    title: string
    code: string
    deadline: string
    thumbnail?: Media
    players?: Player[]
    challenges?: ChallengeGameList[]
}

/**
 * @tableName : medias
 * @description : Représente un media
 */
interface Media {
    id: number
    url: string
    path: string
    uploaded_time: string
    size: number
    type: string // image | audio | video
}

/**
 * @tableName : challenges
 * @description : Représente un challenge dans sa forme la plus global (d'un POV externe à la gamelist)
 */
interface Challenge {
    id: number,
    creator?: User
    published_state: string
    show_creator: boolean
    emoji: string
    points: number
    title: string
    created_at: string
    updated_at: string
}

/**
 * @tableName : challenge_gamelist (table pivot)
 * @description : Représente un challenge au sein d'une gamelist
 */
interface ChallengeGameList {
    id: number
    parent?: Challenge // On retrouve cette clef parent si jamais on souhaite récupérer les infos du challenge global (point, titre, emij ...)
}

/**
 * @tableName : users
 * @description : Représente un user dans sa forme la plus global (d'un POV externe à la gamelist)
 */
interface User {
    id: number
    username: string
    email: string
}

/**
 * @tableName : players (table pivot)
 * @description Représente un user dans une gamelist
 */
interface Player {

    id: number
    pseudo: string
    code: string
    score: number
    challenge_gamelist_infos?: PlayerChallengeGameListInfos[]
    user?: User // On retrouve cette clef optionnelle si jamais on souhaite avoir les infos sur le user global de ce player
}

/**
 * @tableName : player_challenge_infos (table pivot)
 * @description : Représente les infos des challenges pour un player au sein d'une gamelist (son status, sa preuve associée ...)
 */
interface PlayerChallengeGameListInfos {
    challenge_gamelist?: ChallengeGameList
    status: string // validated | normal | validation_pending
    validate_date: string | null
    associated_proof?: Proof // Il est possible qu'une proof soit liée à un challenge du player dans le cas ou ce dernier à soumis une preuve (status = validation_pending)
    player?: Player
}

/**
 * @description : Représente les statistic de votes pour une preuve donnée
 */
interface ProofStatistics {
    voters_count: number,
    validated_percent: number,
    refused_percent: number,
    no_voted_percent: number,
    validated_count: number,
    refused_count: number,
    no_voted_count: number,
    validation_progression_percent: number,
    is_majority_validated: boolean,
    is_majority_refused: boolean
}

////////////////////////////////////////////////////////////////////////////
// APRES GET /me?with=_activeProofs,gamelists,_playerInfos
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/users/me?with=gamelists,_activeProofs,_playerInfos
 */
interface MeResponse {
    gamelists: GameList
    active_proofs: {[key: number]: Proof[]}
    player_infos: {[key: number]: Player}
}

/**
 * @code : let gameLists = MeResponse.gamelists
 */
let gameLists: GameList[] = [
    {
        id: 5,
        title: "...",
        code: "...",
        deadline: "2021-07-13",
        thumbnail: { // Media
            id: 25,
            url: "...",
            path: "...",
            uploaded_time: "...",
            size: 37.31,
            type: "...",
        },
        challenges: [ // ChallengeGameList[]
            {
                id: 5,
                parent: { // Challenge
                    id: 195,
                    published_state: "...",
                    show_creator: false,
                    emoji: "😣",
                    points: 5,
                    title: "...",
                    created_at: "...",
                    updated_at: "...",
                }

            },
        ],
        players: [ // Player[]
            {
                id: 55,
                pseudo: "...",
                code: "...",
                score: 44,
            }
        ]
    }
]

/**
 * @code : let activeProofs = MeResponse.active_proofs
 */
let activeProofs: {[key: number]: Proof[]} = {
    5: [
        {
            id: 115,
            creator: { // Player
                id: 55,
                pseudo: "...",
                code: "...",
                score: 0
            },
            is_closed: false,
            closed_date: null,
            challenge_gamelist: { // ChallengeGameList
                id: 5,
            },
            achievers: [ // Player[]
                {
                    id: 5,
                    pseudo: "...",
                    code: "...",
                    score: 0
                }
            ],
            media: { // Media
                id: 635,
                url: "...",
                path: "...",
                uploaded_time: "...",
                size: 3.69,
                type: "..."
            },
            stats: { // ProofStatistics
                voters_count: 9,
                validated_percent: 0,
                refused_percent: 0,
                no_voted_percent: 100,
                validated_count: 0,
                refused_count: 0,
                no_voted_count: 9,
                validation_progression_percent: 0,
                is_majority_validated: false,
                is_majority_refused: false
            }
        },
    ]
}

/**
 * @code : let playerInfos = MeResponse.player_infos
 */
let playerInfos: {[key: number]: Player} = {
    5: {
        id: 55,
        pseudo: "...",
        code: "...",
        score: 44,
        challenge_gamelist_infos: [
            {
                challenge_gamelist: {
                    id: 5
                }, // ChallengeGameList
                status: "...",
                validate_date: null,
                associated_proof: {
                    id: 115,
                    creator: {
                        id: 55, // id du player et non du user
                        pseudo: "...",
                        code: "...",
                        score: 0
                    }, // Player
                    is_closed: false,
                    closed_date: null,
                    achievers: [
                        {
                            id: 355, // id du player et non du user
                            pseudo: "...",
                            code: "...",
                            score: 0
                        }
                    ], // Player[]
                    media: {
                        id: 635,
                        url: "...",
                        path: "...",
                        uploaded_time: "...",
                        size: 3.69,
                        type: "..."
                    }, // Media
                    stats: {
                        voters_count: 9,
                        validated_percent: 0,
                        refused_percent: 0,
                        no_voted_percent: 100,
                        validated_count: 0,
                        refused_count: 0,
                        no_voted_count: 9,
                        validation_progression_percent: 0,
                        is_majority_validated: false,
                        is_majority_refused: false
                    } // ProofStatistics
                }, // Proof
            }
        ]
    }
}


