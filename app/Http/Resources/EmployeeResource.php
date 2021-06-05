<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        $urlBaseFiles = getenv('AZURE_STORAGE_URL');
        $position = $this->position->title;

        $picture = !empty($this->picture) ? $urlBaseFiles . '/'. $this->picture: "";

        return [
            'id' => $this->id,
            'name' => $this->name,
            'firstName' => $this->first_name,
            'secondName' => $this->second_name,
            'email' => $this->email,
            'birthday' => $this->birthday,
            'phone' => $this->phone,
            'position' => $position,
            'position_id' => $this->position_id,
            'picture' => $picture,
            'salary' => $this->salary,
        ];
    }
}
