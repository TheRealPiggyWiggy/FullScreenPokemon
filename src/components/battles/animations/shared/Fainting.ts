import { Team } from "battlemovr/src/Teams";
import { Component } from "eightbittr";

import { FullScreenPokemon } from "../../../../FullScreenPokemon";
import { IBattleInfo, IPokemon } from "../../../Battles";
import { IThing } from "../../../Things";

/**
 * Animations for a Pokemon fainting.
 */
export class Fainting<TGameStartr extends FullScreenPokemon> extends Component<TGameStartr> {
    /**
     * Runs a fainting animation.
     *
     * @param pokemon   Pokemon fainting.
     * @param team   The Pokemon's team.
     * @param onComplete   Handler for when this is done.
     */
    public run(pokemon: IPokemon, team: Team, onComplete: () => void): void {
        const battleInfo: IBattleInfo = this.gameStarter.battleMover.getBattleInfo() as IBattleInfo;
        const teamName: "player" | "opponent" = Team[team] as "player" | "opponent";
        const thing: IThing = battleInfo.things[teamName];
        const blank: IThing = this.gameStarter.battles.decorations.addThingAsText(
            "WhiteSquare",
            {
                width: thing.width * thing.scale!,
                height: thing.height * thing.scale!
            });

        this.gameStarter.battles.decorations.moveToBeforeBackground(blank);
        this.gameStarter.battles.decorations.moveToBeforeBackground(thing);

        this.gameStarter.physics.setLeft(blank, thing.left);
        this.gameStarter.physics.setTop(blank, thing.top + thing.height * thing.scale!);

        this.gameStarter.actions.sliding.slideVertically(
            thing,
            8,
            this.gameStarter.physics.getMidY(thing) + thing.height * thing.scale!,
            1,
            (): void => {
                const playerName = this.gameStarter.itemsHolder.getItem("name");
                const partyIsWipedText: (string | string[])[][] = [[pokemon.nickname, " fainted!"]];

                this.gameStarter.physics.killNormal(thing);
                this.gameStarter.physics.killNormal(blank);
                this.gameStarter.menuGrapher.createMenu("GeneralText");
                if (this.gameStarter.battles.isPartyWiped()) {
                    partyIsWipedText.push(
                        [playerName, " is out of useable Pokemon!"],
                        [playerName, " blacked out!"]);
                }

                this.gameStarter.menuGrapher.addMenuDialog("GeneralText", partyIsWipedText, onComplete);
                this.gameStarter.menuGrapher.setActiveMenu("GeneralText");
            });

        this.gameStarter.modAttacher.fireEvent(this.gameStarter.mods.eventNames.onFaint, pokemon, battleInfo.teams.player.actors);
    }
}
