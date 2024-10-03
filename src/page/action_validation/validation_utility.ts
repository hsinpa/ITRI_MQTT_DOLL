import { Rule_Type } from "../../data/mqtt_action_rules";
import { Validation_Score } from "../../data/mqtt_action_table";

export let process_msg_event = function(target_event_id: string, rules: Rule_Type[]) {
    for (let r_index = 0; r_index < rules.length; r_index++) {
        let rule: Rule_Type = rules[r_index];
        let index = rule.matches.findIndex(x=>x == target_event_id);

        if (index >= 0) return true;
    }

    return false
} 

export let single_audio_rule_matching = function(target_event_id: string, score: number, rules: Rule_Type[]) {

    for (let r_index = 0; r_index < rules.length; r_index++) {
        let rule: Rule_Type = rules[r_index];
        if (rule.matches.length !=  1) continue;

        if (rule.matches[0] == target_event_id && ops_query(score, rule.value, rule.operation)) return rule;
    }

    return null;
}

export let rule_matching = function(target_event_id: string, state: string, rules: Rule_Type[], validation_scores: Validation_Score[]) {

    for (let r_index = 0; r_index < rules.length; r_index++) {
        let rule: Rule_Type = rules[r_index];
        let index = rule.matches.findIndex(x=>x == target_event_id);
        let score = validation_scores.find(x=>x.name == rule.score_id);

        if (score == null) continue;

        if (ops_query(score.score, rule.value, rule.operation)) return rule;
    }

    return null;
}

let ops_query = function(value: number, constraint: number, ops: string) {

    // console.log(value, constraint, ops)
    if (ops == "==") {
        return value == constraint;
    }

    if (ops == ">") {
        return value > constraint;
    }

    if (ops == "<") {
        return value < constraint;
    }

    return false;
}