////////////////////////////////////////////////////////////////////////////
// MODELS
////////////////////////////////////////////////////////////////////////////

/**
 * @tableName : challenges
 * @description : Représente un challenge dans sa forme la plus global (d'un POV externe à la gamelist)
 */
interface Challenge {
    id: number,
    published_state: string
    show_creator: boolean
    emoji: string
    points: number
    title: string
    created_at: string
    updated_at: string
    creator?: User
    categories?: ChallengeCategory[]
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName: challenge_category
 * @description : Représente la catégory d'un challenge
 */
interface ChallengeCategory {
    id: number
    title: string
    color: string
    is_active: boolean
    challenges?: Challenge[]
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : challenge_gamelist (table pivot)
 * @description : Représente un challenge au sein d'une gamelist
 */
interface ChallengeGameList {
    id: number
    parent?: Challenge // On retrouve cette clef parent si jamais on souhaite récupérer les infos du challenge global (point, titre, emij ...)
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : gamelists
 * @description : Représente une gamelist
 */
interface GameList {
    id: number
    title: string
    code: string
    deadline: string
    creator?: User
    thumbnail?: Media
    players?: Player[]
    challenges?: ChallengeGameList[]
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : gamelist_modes
 * @description : Représente un mode de jeu prédéfini pour une gamelist
 */
interface GameListMode {
    id: number
    title: string
    emoji: string
    description: string
    is_active: boolean
    color: string
    thumbnail?: Media
    creator?: User
    challenges?: Challenge[]
}

// ----------------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : players (table pivot)
 * @description Représente un user dans une gamelist
 */
interface Player {

    id: number
    pseudo: string
    code: string
    score: number
    challenge_infos?: PlayerChallengeInfos[]
    user?: User // On retrouve cette clef optionnelle si jamais on souhaite avoir les infos sur le user global de ce player
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : player_challenge_infos (table pivot)
 * @description : Représente les infos des challenges pour un player au sein d'une gamelist (son status, sa preuve associée ...)
 */
interface PlayerChallengeInfos {
    status: string // validated | normal | validation_pending
    validate_date: string | null
    associated_proof?: Proof | null // Il est possible qu'une proof soit liée à un challenge du player dans le cas ou ce dernier à soumis une preuve (status = validation_pending)
    player?: Player
    challenge_gamelist?: ChallengeGameList
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : proofs
 * @description : Représente une preuve d'un challenge dans une gamelist
 */
interface Proof {
    id: number
    creator: Player
    is_closed: boolean
    closed_date: string | null
    has_been_validated: boolean | null
    challenge_gamelist?: ChallengeGameList
    achievers: Player[]
    media: Media
    stats?: VoteStatistics
}

// ----------------------------------------------------------------------------------------------------------

/**
 * @description : Représente les statistic de votes pour une preuve donnée
 */
interface VoteStatistics {
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

// ----------------------------------------------------------------------------------------------------------

/**
 * @tableName : users
 * @description : Représente un user dans sa forme la plus global (d'un POV externe à la gamelist)
 */
interface User {
    id: number
    username: string
    email: string
}

////////////////////////////////////////////////////////////////////////////
// APRES GET /me?with=_activeProofs,gameLists,_playerInfos
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/users/me?with=gameLists,_activeProofs,_playerInfos
 */
interface MeResponse {
    result: string
    data: {
        id: number
        username: string
        email: string
        gamelists: GameList[]
        active_proofs: { [key: number]: Proof[] }
        player_infos: { [key: number]: Player }
    }

}

/**
 * @code : let gameLists = MeResponse.data.gamelists
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
                user: {
                    id: 45,
                    username: "...",
                    email: "...",
                }
            }
        ],
        creator: {
            id: 10,
            username: '...',
            email: '...'
        }
    }
]

/**
 * @code : let activeProofs = MeResponse.data.active_proofs
 */
let activeProofs: { [key: string]: Proof[] } = {
    "5": [
        {
            id: 115,
            creator: { // Player
                id: 55,
                pseudo: "",
                code: "",
                score: 44,
                user: {
                    id: 45,
                    username: '',
                    email: ''
                }
            },
            is_closed: false,
            has_been_validated: null,
            closed_date: null,
            challenge_gamelist: { // Challenge GameList
                id: 5,
                parent: {
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
            achievers: [ // Player[]
                {
                    id: 55,
                    pseudo: "",
                    code: "",
                    score: 44,
                    user: {
                        id: 45,
                        username: '',
                        email: ''
                    }
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
 * @code : let playerInfos = MeResponse.data.player_infos
 */
let playerInfos: { [key: string]: Player } = {
    "5": {
        id: 55,
        pseudo: "...",
        code: "...",
        score: 44,
        challenge_infos: [
            {
                challenge_gamelist: { // Challenge GameList
                    id: 5,
                    parent: {
                        id: 195,
                        published_state: "...",
                        show_creator: false,
                        emoji: "😣",
                        points: 5,
                        title: "...",
                        created_at: "...",
                        updated_at: "...",
                    }
                }, // ChallengeGameList
                status: "...",
                validate_date: null,
                associated_proof: { // Proof
                    id: 115,
                    creator: { // Player
                        id: 55,
                        pseudo: "",
                        code: "",
                        score: 44,
                        user: {
                            id: 45,
                            username: '',
                            email: ''
                        }
                    }, // Player
                    is_closed: false,
                    has_been_validated: null,
                    closed_date: null,
                    achievers: [ // Player[]
                        {
                            id: 55,
                            pseudo: "",
                            code: "",
                            score: 44,
                            user: {
                                id: 45,
                                username: '',
                                email: ''
                            }
                        }
                    ],
                    media: {
                        id: 635,
                        url: "...",
                        path: "...",
                        uploaded_time: "...",
                        size: 3.69,
                        type: "..."
                    }, // Media
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
                }
            }
        ]
    }
}

////////////////////////////////////////////////////////////////////////////
// APRES le POST /gamelists
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelists
 */
interface CreateGameListResponse {
    result: 'success'
    data: GameList
}

// Apres avoir recu la réponse, vous avez juste à la push dans la variable globale gamelists :
/**
 * @code : gameList.push(response.data)
 */

////////////////////////////////////////////////////////////////////////////
// APRES le PUT /gamelists/join/{code}
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelists/join/{code}
 */
interface JoinGameListResponse {
    result: 'success'
    data: {
        gamelist: GameList
        active_proofs: Proof[]
        player_infos: Player
    }
}

// Apres avoir recu la réponse, on récupère la gamelist ainsi que les active_proofs et les player_infos associé. Il faut donc les
// push dans les varaibles globales respectives (bien faire attention de créer la clef correspondant à la gamelist id pour les variables
// activeProofs et playerInfos
/**
 * @code :
 * gameList.push(response.data.gamelist)
 * activeProofs[response.data.gamelist.id] = response.data.active_proofs
 * playerInfos[response.data.gamelist.id] = response.data.player_infos
 */

////////////////////////////////////////////////////////////////////////////
// APRES POST /gamelists/{gameListId}/proofs
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelists/{gameListId}/proofs
 */
interface createProofResponse {
    result: 'success'
    data: Player
}

// Après avoir recu la réponse, on va remplacer la variable global playerInfos par la clef data de la réponse (pour la bonne clef de gameList)
/**
 * @code : playerInfos[gameListId] = response.data
 */

////////////////////////////////////////////////////////////////////////////
// APRES POST /gamelists/{gameListId}/proofs/{proofId}/votes
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelists/{gameListId}/proofs
 */
interface VoteProofResponse {
    result: 'success'
    data: Proof
}

// Après avoir recu la réponse, on va récupérer les nouvelles stats de la proof (dans la clef data de la réponse) pour afficher le pourcentage de validé et de refus
// Une fois que l'utilisateur quitte cette interface ou passe à une proof suivante, on supprime la proof de la variable globale activeProofs

////////////////////////////////////////////////////////////////////////////
// APRES GET /gamelist_modes?with=challenges&filter_by=is_active&filter_for[is_active]=1
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelist_modes?with=challenges&filter_by=is_active&filter_for[is_active]=1
 */
interface GetGameListModesResponse {
    result: 'success'
    data: GameListMode[]
}

////////////////////////////////////////////////////////////////////////////
// APRES GET /challenge_categories?with=challenges&filter_by=is_active&filter_for[is_active]=1
////////////////////////////////////////////////////////////////////////////
/**
 * @description : Réponse HTTP de l'url : https://api.summerlist.app/gamelist_modes?with=challenges&filter_by=is_active&filter_for[is_active]=1
 */
interface GetChallengeCategoriesResponse {
    result: 'success'
    data: ChallengeCategory[]
}

////////////////////////////////////////////////////////////////////////////
// PUSHER EVENTS
////////////////////////////////////////////////////////////////////////////

/**
 * @name user-join-gamelist
 * @description Emet l'event sur le channel gamelist_{id}
 */

interface UserJoinGameListEventPayload {
    data: {
        new_player: Player
    }
}

const userJoinGameListEventPayload: UserJoinGameListEventPayload = {
    data: {
        new_player: {
            id: 55,
            pseudo: "Erwan",
            code: "802d8529-44f9-4987-a5a2-599025476515",
            score: 44,
            user: {
                id: 45,
                username: 'Naël',
                email: 'nael@mail.com'
            }
        }
    }
}

/**
 * @action : On va push le new_player dans le tableau player de la gameList dont l'id correspond à celle du channel
 */

const gamelistId = 5
gameLists[gamelistId].players.push(userJoinGameListEventPayload.data.new_player)

// ----------------------------------------------------------------------------------------------------------

/**
 * @name user-create-proof
 * @description Emet l'event sur le channel gamelist_{id}
 */

interface UserCreateProofEventPayload {
    data: {
        new_proof: Proof
        achievers_player_infos: Player[]
    }
}

const userCreateProofEventPayload: UserCreateProofEventPayload = {
    data: {
        new_proof: {
            id: 115,
            creator: { // Player
                id: 55,
                pseudo: "",
                code: "",
                score: 44,
                user: {
                    id: 45,
                    username: '',
                    email: ''
                }
            },
            is_closed: false,
            has_been_validated: null,
            closed_date: null,
            challenge_gamelist: { // Challenge GameList
                id: 5,
                parent: {
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
            achievers: [ // Player[]
                {
                    id: 55,
                    pseudo: "",
                    code: "",
                    score: 44,
                    user: {
                        id: 45,
                        username: '',
                        email: ''
                    }
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
        achievers_player_infos: [
            {
                id: 55,
                pseudo: "...",
                code: "...",
                score: 44,
                challenge_infos: [
                    {
                        challenge_gamelist: { // Challenge GameList
                            id: 5,
                            parent: {
                                id: 195,
                                published_state: "...",
                                show_creator: false,
                                emoji: "😣",
                                points: 5,
                                title: "...",
                                created_at: "...",
                                updated_at: "...",
                            }

                        }, // ChallengeGameList
                        status: "...",
                        validate_date: null,
                        associated_proof: {
                            id: 115,
                            creator: { // Player
                                id: 55,
                                pseudo: "",
                                code: "",
                                score: 44,
                                user: {
                                    id: 45,
                                    username: '',
                                    email: ''
                                }
                            }, // Player
                            is_closed: false,
                            has_been_validated: null,
                            closed_date: null,
                            achievers: [ // Player[]
                                {
                                    id: 55,
                                    pseudo: "",
                                    code: "",
                                    score: 44,
                                    user: {
                                        id: 45,
                                        username: '',
                                        email: ''
                                    }
                                }
                            ],
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
        ]
    }
}

/**
 * @action :
 * 1) On va ajouter cette proof dans le tableau activeProofs de tous les joueurs de la gamelists sauf pour les achievers de la proof !
 *
 * 2) Pour chaque achiever de la proof qui n'est pas le creator, on va aller remplacer dans la variable globale playerInfos, pour la clef de la gamelist courante,
 * le playerInfos respectif en utilisant la clef player_infos du payload de l'event. Le creator lui a déjà update sa variable playerInfos grâce aux données
 * récupérées dans la réponse http "Create proof)
 */

// ----------------------------------------------------------------------------------------------------------

/**
 * @name user-vote-proof
 * @description Emet l'event sur le channel gamelist_{id}
 */

interface UserVoteProofEventPayload {
    data: {
        proof: Proof,
        voter: Player,
        has_validate: boolean
    }
}

const userVoteProofEventPayload: UserVoteProofEventPayload = {
    data: {
        proof: {
            id: 115,
            creator: { // Player
                id: 55,
                pseudo: "",
                code: "",
                score: 44,
                user: {
                    id: 45,
                    username: '',
                    email: ''
                }
            },
            is_closed: false,
            has_been_validated: null,
            closed_date: null,
            challenge_gamelist: { // Challenge GameList
                id: 5,
                parent: {
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
            achievers: [ // Player[]
                {
                    id: 55,
                    pseudo: "",
                    code: "",
                    score: 44,
                    user: {
                        id: 45,
                        username: '',
                        email: ''
                    }
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
        voter: {
            id: 30,
            pseudo: "Erwan",
            code: "802d8529-44f9-4987-a5a2-599025476515",
            score: 0,
            user: {
                id: 25,
                username: 'Naël',
                email: 'nael@mail.com'
            }
        },
        has_validate: true // Le voter à validé ou pas le
    }
}

/**
 * @action :
 * 1) Il faut mettre à jour la proof dans le tableau activeProofs de tous les players (sauf des achievers) de la gameList
 * car les stats de vote de la proof ont été mis à jour suite au nouveau vote
 *
 * 2) Afficher la popup uniquement aux achievers de la proof un truc du genre (Erwan à refusé/validé ta preuve pour le challenge ...)
 */

// ----------------------------------------------------------------------------------------------------------

/**
 * @name proof-completed
 * @description : Emet l'event sur le channel gamelist_{id}
 */

interface ProofCompletedEventPayload {
    data: {
        proof: Proof
        player_infos: Player[]
    }
}

const proofCompletedEventPayload: ProofCompletedEventPayload = {
    data: {
        proof: {
            id: 115,
            creator: { // Player
                id: 55,
                pseudo: "",
                code: "",
                score: 44,
                user: {
                    id: 45,
                    username: '',
                    email: ''
                }
            },
            is_closed: true,
            closed_date: '2021-06-30',
            has_been_validated: true,
            challenge_gamelist: { // Challenge GameList
                id: 5,
                parent: {
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
            achievers: [ // Player[]
                {
                    id: 55,
                    pseudo: "",
                    code: "",
                    score: 44,
                    user: {
                        id: 45,
                        username: '',
                        email: ''
                    }
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
                validated_percent: 60,
                refused_percent: 0,
                no_voted_percent: 10,
                validated_count: 5,
                refused_count: 0,
                no_voted_count: 1,
                validation_progression_percent: 100,
                is_majority_validated: true,
                is_majority_refused: false
            }
        },
        player_infos: [ // player infos of achievers
            {
                id: 55,
                pseudo: "...",
                code: "...",
                score: 44,
                challenge_infos: [
                    {
                        challenge_gamelist: {
                            id: 5
                        }, // ChallengeGameList
                        status: "...",
                        validate_date: null,
                        associated_proof: {
                            id: 115,
                            creator: { // Player
                                id: 55,
                                pseudo: "",
                                code: "",
                                score: 44,
                                user: {
                                    id: 45,
                                    username: '',
                                    email: ''
                                }
                            }, // Player
                            is_closed: false,
                            has_been_validated: null,
                            closed_date: null,
                            achievers: [ // Player[]
                                {
                                    id: 55,
                                    pseudo: "",
                                    code: "",
                                    score: 44,
                                    user: {
                                        id: 45,
                                        username: '',
                                        email: ''
                                    }
                                }
                            ],
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
        ]
    }
}

/**
 * @action
 * 1) On va notifier seulement aux achievers le résultat de la preuve (avec une popup par exemple)
 *
 * 2) On va aller mettre à jour pour tous les joueurs de la gamelist les données des achievers (car leur score à peut être changé)
 * Pour se faire, on recupère les données des player dans achiever et aller mettre à jour la variable global gamelists (clef players)
 *
 * 3) Pour chaque achiever de la proof, on va aller remplacer dans la variable globale playerInfos, pour la clef de la gamelist courrante,
 * le playerInfos respectif en utilisant la clef player_infos du payload de l'event
 */

// ----------------------------------------------------------------------------------------------------------

/**
 * @name player-pseudo-updated
 * @description : Emet l'event sur le channel gamelist_{id}
 */

interface PlayerPseudoUpdatedEventPayload {
    data: {
        player: Player
    }
}

const playerPseudoUpdatedEventPayload: PlayerPseudoUpdatedEventPayload = {
    data: {
        player: {
            id: 30,
            pseudo: "Wati bg du desert",
            code: "802d8529-44f9-4987-a5a2-599025476515",
            score: 0,
            user: {
                id: 25,
                username: 'Naël',
                email: 'nael@mail.com'
            }
        }
    }
}

/**
 * @action : On va aller mettre à jour le player dans la variable global gameLists
 */